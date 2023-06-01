import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers";
import "../index.css";
import { searchUsers, getUser } from "../actions/userActions";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaChevronUp, FaChevronDown } from "react-icons/fa";

const UserSearch: React.FC = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state: RootState) => state.user.userList);
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleUserClick = (username: string) => {
    if (selectedUser === username && isOpen) {
      setIsOpen(false);
    } else {
      dispatch<any>(getUser(username));
      setSelectedUser(username);
      setIsOpen(true);
    }
  };
  

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setError("Search query cannot be empty");
    } else {
      setError("");
      setIsLoading(true);
      await dispatch<any>(searchUsers(searchQuery));
      console.log(userList)
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="p-4 max-w-lg mx-auto bg-light rounded shadow">
        <form onSubmit={handleSearch} className="d-flex mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow form-control me-2"
            placeholder="Search users"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
        <Accordion>
  {userList.map((user) => (
    <AccordionItem key={user.id}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div
                    onClick={() => handleUserClick(user.login)}
                    className={`p-2 mb-2 rounded d-flex align-items-center justify-content-between ${
                      selectedUser === user.login ? "bg-primary text-white" : ""
                    }`}
                  >
                    <div>{user.login}</div>
                    {isOpen && selectedUser === user.login ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {selectedUser === user.login && userDetails && isOpen ? (
                  isLoading ? (
                    <div className="p-2 bg-light rounded skeleton">
                      {/* Skeleton Loading Effect */}
                    </div>
                  ) : userDetails.length > 0 ? (
                    <div className="p-2 bg-light rounded">
                      {userDetails.map((repo: any) => (
                        <div
                          key={repo.id}
                          className="d-flex align-items-center bg-white p-2 mb-2 justify-content-between"
                        >
                          <div>
                            <h4 className="text-primary">{repo.name}</h4>
                            <p>{repo.description}</p>
                          </div>
                          <p className="ml-2 d-flex align-items-center">
                            <FaStar className="text-warning" />{" "}
                            {repo.stargazers_count}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2 bg-light rounded text-center">
                      No user details found.
                    </div>
                  )
                ) : null}
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default UserSearch;
