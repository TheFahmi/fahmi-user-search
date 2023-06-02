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

  const handleUserClick = async (username: string) => {
    setIsLoading(true);
    if (selectedUser === username && isOpen) {
      setIsOpen(false);
      setIsLoading(false);
    } else {
      await dispatch<any>(getUser(username));
      setSelectedUser(username);
      setIsLoading(false);
      setIsOpen(true);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (searchQuery.trim() === "") {
      setError("Search query cannot be empty");
    } else {
      setError("");
      await dispatch<any>(searchUsers(searchQuery));
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="shadow bg-light rounded">
        <div className="p-4 max-w-lg mx-auto bg-light sticky-top">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              data-testid="user-input"
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
        </div>

        <div className="pb-4 px-4 max-w-lg mx-auto bg-light">
          <Accordion>
            {userList.map((user) => (
              <AccordionItem key={user.id}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <div
                      data-testid="user-click"
                      onClick={() => handleUserClick(user.login)}
                      className={`p-2 my-2 rounded d-flex align-items-center justify-content-between ${
                        selectedUser === user.login ? "bg-primary text-white" : ""
                      }`}
                    >
                      <div data-testid="user-login">{user.login}</div>
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
                    <div
                      className={`bg-light rounded ${
                        isLoading ? "skeleton" : ""
                      }`}
                      style={{
                        maxHeight: isLoading ? "120px" : "none",
                        transition: "max-height 0.3s ease",
                        overflow: "hidden",
                      }}
                    >
                      {isLoading ? (
                        <div>
                          <div className="skeleton-row" />
                          <div className="skeleton-row" />
                          <div className="skeleton-row" />
                        </div>
                      ) : userDetails.length > 0 ? (
                        userDetails.map((repo: any) => (
                          <div
                            key={repo.id}
                            className="d-flex rounded align-items-center bg-white p-2 mb-2 justify-content-between"
                          >
                            <div className="w-75">
                              <h4
                                className="text-primary"
                                data-testid="repo-name"
                              >
                                {repo.name}
                              </h4>
                              <p data-testid="repo-description">
                                {repo.description}
                              </p>
                            </div>
                            <p
                              className="ml-2 d-flex align-items-center gap-2"
                              data-testid="stargazers"
                            >
                              <FaStar className="text-warning" />{" "}
                              {repo.stargazers_count}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="p-2 bg-light rounded text-center">
                          No user details found.
                        </div>
                      )}
                    </div>
                  ) : null}
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
