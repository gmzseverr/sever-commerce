import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { updatePayment } from "../redux/actions/shoppingCartActions";
import { useDispatch } from "react-redux";
import AddCard from "./AddCard";

function SavedPayment({ onCardSelect }) {
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [cardDetails, setCardDetails] = useState({});

  const dispatch = useDispatch();

  const openEditForm = (card) => {
    setCurrentCard(card);
    setCardDetails({
      card_no: card.card_no,
      name_on_card: card.name_on_card,
      expire_month: card.expire_month,
      expire_year: card.expire_year,
    });
    setIsEditing(true);
  };

  const fetchSavedCards = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast.error("Token not found, please log in.");
      return;
    }

    try {
      const response = await API.get("/user/card", {
        headers: {
          Authorization: token,
          "X-USER-ROLE": "client",
        },
      });

      setSavedCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error.response || error);
      toast.error("Unable to fetch saved cards.");
    }
  };

  useEffect(() => {
    fetchSavedCards();
  }, []);

  const maskCardNumber = (cardNumber) => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  const handleCardSelect = (id) => {
    const selectedCard = savedCards.find((card) => card.id === id);
    setSelectedCardId(selectedCardId === id ? null : id);
    if (onCardSelect) {
      onCardSelect(selectedCardId === id ? null : selectedCard);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast.error("Token not found, please log in.");
      return;
    }

    try {
      await API.delete(`/user/card/${paymentId}`, {
        headers: {
          Authorization: token,
        },
      });
      setSavedCards(savedCards.filter((card) => card.id !== paymentId));
      toast.success("Card deleted successfully.");
    } catch (error) {
      console.error("Error deleting payment:", error);
      toast.error("Error occurred while deleting payment.");
    }
  };

  const updatePaymentCard = async () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      toast.error("Token not found, please log in.");
      return;
    }

    const cardData = {
      id: currentCard.id,
      card_no: cardDetails.card_no,
      expire_month: cardDetails.expire_month,
      expire_year: cardDetails.expire_year,
      name_on_card: cardDetails.name_on_card,
    };

    try {
      const response = await API.put(`/user/card`, cardData, {
        headers: {
          Authorization: token,
          "X-USER-ROLE": "client",
        },
      });

      const updatedCard = response.data;
      const updatedCards = savedCards.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );

      setSavedCards(updatedCards);
      dispatch(updatePayment(updatedCard));
      fetchSavedCards();
      toast.success("Card details updated successfully.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating card:", error);
      toast.error("Error occurred while updating card.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4 ">
      <AddCard fetchSavedCards={fetchSavedCards} />

      {savedCards.length > 0 ? (
        <div className=" flex flex-col gap-4">
          {savedCards.map((card) => (
            <div
              key={card.id}
              className={`p-4 sm:p-5 border rounded-lg shadow-md transition-all transform hover:scale-105 cursor-pointer ${
                selectedCardId === card.id
                  ? "bg-[#23A6F0] border-[#23A6F0] text-white ring-2 ring-[#23A6F0]"
                  : "bg-white border-gray-300 hover:shadow-lg hover:border-[#23A6F0]"
              }`}
              onClick={() => handleCardSelect(card.id)}
            >
              <div className="flex items-center gap-3 ">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  size="2x"
                  className={`${
                    selectedCardId === card.id ? "text-white" : "text-gray-600"
                  }`}
                />
                <div>
                  <p
                    className={`font-semibold text-base ${
                      selectedCardId === card.id
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                  >
                    {maskCardNumber(card.card_no)}
                  </p>
                  <p
                    className={`${
                      selectedCardId === card.id
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {card.name_on_card}
                  </p>
                  <p
                    className={`${
                      selectedCardId === card.id
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {`${card.expire_month}/${card.expire_year}`}
                  </p>
                </div>
              </div>

              <section className="flex gap-3 justify-end mt-4">
                <FontAwesomeIcon
                  className="text-gray-400 hover:text-blue-400 hover:cursor-pointer"
                  icon={faPenToSquare}
                  onClick={() => openEditForm(card)}
                />
                <FontAwesomeIcon
                  className="text-gray-400 hover:text-blue-400 hover:cursor-pointer"
                  icon={faTrashCan}
                  onClick={() => handleDeletePayment(card.id)}
                />
              </section>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved credit cards yet.</p>
      )}

      {isEditing && (
        <div className="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg text-gray-700 font-bold mb-4">
              Update Payment
            </h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold py-2 text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  name="card_no"
                  value={maskCardNumber(cardDetails.card_no)}
                  onChange={handleInputChange}
                  className="p-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold py-2 text-gray-700">
                  Name on Card
                </label>
                <input
                  type="text"
                  name="name_on_card"
                  value={cardDetails.name_on_card}
                  onChange={handleInputChange}
                  className="p-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex gap-4">
                <div className="mb-4">
                  <label className="block text-sm font-bold py-2 text-gray-700">
                    Expiration Month
                  </label>
                  <input
                    type="text"
                    name="expire_month"
                    value={cardDetails.expire_month}
                    onChange={handleInputChange}
                    className="p-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold py-2 text-gray-700">
                    Expiration Year
                  </label>
                  <input
                    type="text"
                    name="expire_year"
                    value={cardDetails.expire_year}
                    onChange={handleInputChange}
                    className="p-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={updatePaymentCard}
                  className="bg-[#23A6F0] text-white py-2 px-4 rounded-md hover:bg-[#1a8eb2]"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SavedPayment;
