
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import UserSearch from "../components/UserSearch";
import { searchUsers, getUser } from "../actions/userActions";
import * as userActions from "../actions/userActions";

const mockStore = configureStore([thunk]);

describe("UserSearch component", () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      user: {
        userList: [
          {
            "login": "fahmi",
            "id": 653044,
            "node_id": "MDQ6VXNlcjY1MzA0NA==",
            "avatar_url": "https://avatars.githubusercontent.com/u/653044?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/fahmi",
            "html_url": "https://github.com/fahmi",
            "followers_url": "https://api.github.com/users/fahmi/followers",
            "following_url": "https://api.github.com/users/fahmi/following{/other_user}",
            "gists_url": "https://api.github.com/users/fahmi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/fahmi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/fahmi/subscriptions",
            "organizations_url": "https://api.github.com/users/fahmi/orgs",
            "repos_url": "https://api.github.com/users/fahmi/repos",
            "events_url": "https://api.github.com/users/fahmi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/fahmi/received_events",
            "type": "User",
            "site_admin": false,
            "score": 1
        },
        {
            "login": "rizafahmi",
            "id": 1147918,
            "node_id": "MDQ6VXNlcjExNDc5MTg=",
            "avatar_url": "https://avatars.githubusercontent.com/u/1147918?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/rizafahmi",
            "html_url": "https://github.com/rizafahmi",
            "followers_url": "https://api.github.com/users/rizafahmi/followers",
            "following_url": "https://api.github.com/users/rizafahmi/following{/other_user}",
            "gists_url": "https://api.github.com/users/rizafahmi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/rizafahmi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/rizafahmi/subscriptions",
            "organizations_url": "https://api.github.com/users/rizafahmi/orgs",
            "repos_url": "https://api.github.com/users/rizafahmi/repos",
            "events_url": "https://api.github.com/users/rizafahmi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/rizafahmi/received_events",
            "type": "User",
            "site_admin": false,
            "score": 1
        },
        {
            "login": "fahmifan",
            "id": 19581621,
            "node_id": "MDQ6VXNlcjE5NTgxNjIx",
            "avatar_url": "https://avatars.githubusercontent.com/u/19581621?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/fahmifan",
            "html_url": "https://github.com/fahmifan",
            "followers_url": "https://api.github.com/users/fahmifan/followers",
            "following_url": "https://api.github.com/users/fahmifan/following{/other_user}",
            "gists_url": "https://api.github.com/users/fahmifan/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/fahmifan/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/fahmifan/subscriptions",
            "organizations_url": "https://api.github.com/users/fahmifan/orgs",
            "repos_url": "https://api.github.com/users/fahmifan/repos",
            "events_url": "https://api.github.com/users/fahmifan/events{/privacy}",
            "received_events_url": "https://api.github.com/users/fahmifan/received_events",
            "type": "User",
            "site_admin": false,
            "score": 1
        },
        {
            "login": "fahmihidayah",
            "id": 5541312,
            "node_id": "MDQ6VXNlcjU1NDEzMTI=",
            "avatar_url": "https://avatars.githubusercontent.com/u/5541312?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/fahmihidayah",
            "html_url": "https://github.com/fahmihidayah",
            "followers_url": "https://api.github.com/users/fahmihidayah/followers",
            "following_url": "https://api.github.com/users/fahmihidayah/following{/other_user}",
            "gists_url": "https://api.github.com/users/fahmihidayah/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/fahmihidayah/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/fahmihidayah/subscriptions",
            "organizations_url": "https://api.github.com/users/fahmihidayah/orgs",
            "repos_url": "https://api.github.com/users/fahmihidayah/repos",
            "events_url": "https://api.github.com/users/fahmihidayah/events{/privacy}",
            "received_events_url": "https://api.github.com/users/fahmihidayah/received_events",
            "type": "User",
            "site_admin": false,
            "score": 1
        },
        {
            "login": "fahmiirsyadk",
            "id": 17546686,
            "node_id": "MDQ6VXNlcjE3NTQ2Njg2",
            "avatar_url": "https://avatars.githubusercontent.com/u/17546686?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/fahmiirsyadk",
            "html_url": "https://github.com/fahmiirsyadk",
            "followers_url": "https://api.github.com/users/fahmiirsyadk/followers",
            "following_url": "https://api.github.com/users/fahmiirsyadk/following{/other_user}",
            "gists_url": "https://api.github.com/users/fahmiirsyadk/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/fahmiirsyadk/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/fahmiirsyadk/subscriptions",
            "organizations_url": "https://api.github.com/users/fahmiirsyadk/orgs",
            "repos_url": "https://api.github.com/users/fahmiirsyadk/repos",
            "events_url": "https://api.github.com/users/fahmiirsyadk/events{/privacy}",
            "received_events_url": "https://api.github.com/users/fahmiirsyadk/received_events",
            "type": "User",
            "site_admin": false,
            "score": 1
        }
        ],
        userDetails: [],
      },
    });

    component = render(
      <Provider store={store}>
        <UserSearch />
      </Provider>
    );
  });

  it("renders the UserSearch component", () => {
    const { getByText, getByPlaceholderText } = component;

    // Check if the necessary elements are rendered
    expect(getByPlaceholderText("Search users")).toBeInTheDocument();
    expect(getByText("Search")).toBeInTheDocument();
  });

  it("updates searchQuery state on input change", () => {
    const { getByPlaceholderText } = component;

    const inputElement = getByPlaceholderText("Search users");

    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(inputElement.value).toBe("test");
  });



});


