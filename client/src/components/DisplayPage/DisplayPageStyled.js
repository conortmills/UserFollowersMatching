import React from "react";
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PageHeader = styled.div`
  font-size: 40px;
  padding-bottom: 15px;
`;

export const Instructions = styled.div`
  font-size: 20px;
  padding-bottom: 15px;
`;

export const UserEntrySection = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 24px;
`;

export const UserEntry = styled.div`
  display: flex;
  padding: 15px;
`;

export const TextEntry = styled.input`
  margin-left: 10px;
`;
export const ButtonBox = styled.div`
  display: flex;
  padding: 15px;
`;

export const SubmitButton = styled.button`
  margin: 15px;
  height: 40px;
  width: 160px;
  font-size: 20px;
`;

export const ClearButton = styled.button`
  margin: 15px;
  height: 40px;
  width: 160px;
  font-size: 20px;
`;

export const ErrorMessage = styled.div``;

export const NoMatch = styled.div``;

export const Match = styled.div``;

export const MutualFollowers = styled.div``;
