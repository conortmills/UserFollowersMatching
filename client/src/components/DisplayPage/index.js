import React, { useState } from "react";

import {
  PageHeader,
  Instructions,
  UserEntrySection,
  UserEntry,
  TextEntry,
  SubmitButton,
  ButtonBox,
  ClearButton,
  ErrorMessage,
  NoMatch,
  Match,
  MutualFollowers,
  PageContainer,
} from "./DisplayPageStyled";

const DisplayPage = () => {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [user1Followers, setUser1Followers] = useState([]);
  const [user2Followers, setUser2Followers] = useState([]);
  const [mutualFollowers, setMutualFollowers] = useState([]);
  const [searchStatus, setSearchStatus] = useState(false);

  function runFetch() {
    console.log(mutualFollowers);
    const fetchUser1 = () => {
      fetch(`https://api.github.com/users/${user1}/followers`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser1Followers(data);
        });
    };

    const fetchUser2 = () => {
      fetch(`https://api.github.com/users/${user2}/followers`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUser2Followers(data);
        });
    };

    const buildMutualFollowerArray = () => {
      console.log("run");
      console.log(user1Followers);
      var mutFollwers = user1Followers.filter(function (o1) {
        console.log("check");
        return user2Followers.some(function (o2) {
          console.log("executed");
          return o1.login === o2.login;
        });
      });
      setTimeout(function () {
        console.log(user2Followers);
        console.log(mutFollwers);
        setMutualFollowers(mutFollwers);
        setSearchStatus(true);
      }, 1000);
    };

    fetchUser1();
    console.log(user1Followers);
    fetchUser2();
    console.log(user2Followers);
    setTimeout(1000);
    buildMutualFollowerArray();
  }
  function clearPage() {
    setUser1("");
    setUser2("");
    setUser1Followers(null);
    setUser2Followers(null);
    setSearchStatus(false);
  }

  return (
    <PageContainer>
      <PageHeader>Hello!</PageHeader>
      {/* user input section */}
      <Instructions>
        Please enter the names of the 2 users of interest in the boxes below -
        User 1 in box 1 and User 2 in box 2
      </Instructions>
      <UserEntrySection>
        <UserEntry>
          <div>User 1:</div>
          <TextEntry
            type="text"
            value={user1}
            onChange={(ev) => {
              setUser1(ev.target.value);
              console.log(user1);
            }}
          ></TextEntry>
        </UserEntry>
        <UserEntry>
          <div>User 2:</div>
          <TextEntry
            type="text"
            value={user2}
            onChange={(ev) => {
              setUser2(ev.target.value);
              console.log(user2);
            }}
          ></TextEntry>
        </UserEntry>
      </UserEntrySection>
      <ButtonBox>
        <SubmitButton
          type="button"
          onClick={() => runFetch()}
          disabled={user1.length < 1 || user2.length < 1}
        >
          Search
        </SubmitButton>
        <ClearButton type="button" onClick={() => clearPage()}>
          Clear
        </ClearButton>
      </ButtonBox>

      {/* conditionally rendered section depending on return of fetch function */}
      {mutualFollowers && (
        <>
          {searchStatus === false ? (
            <ErrorMessage> Query results will appear here </ErrorMessage>
          ) : user1Followers.message &&
            user2Followers.message === "Not Found" ? (
            <ErrorMessage>
              Neither of these users appear to exist, please make sure that both
              handles are spelled correctly and try again
            </ErrorMessage>
          ) : user1Followers.message === "Not Found" &&
            user2Followers.message != "Not Found" ? (
            <ErrorMessage>
              User 1 does not exist, please make sure that the handle is spelt
              correctly and try again
            </ErrorMessage>
          ) : user1Followers.message != "Not Found" &&
            user2Followers.message === "Not Found" ? (
            <ErrorMessage>
              User 2 does not exist, please make sure that the handle is spelt
              correctly and try again
            </ErrorMessage>
          ) : mutualFollowers.length === 0 ? (
            <NoMatch> These users do not have any mutual followers </NoMatch>
          ) : (
            <Match>
              <div>The specified users share the following followers-</div>
              <div>
                {" "}
                {mutualFollowers.map((login) => (
                  <li>{login.login}</li>
                ))}
              </div>
              <MutualFollowers></MutualFollowers>
            </Match>
          )}
        </>
      )}

      {/* <ErrorMessage>
        There was an issue fetching the results, please refresh the page and try
        again
      </ErrorMessage> */}
    </PageContainer>
  );
};

export default DisplayPage;
