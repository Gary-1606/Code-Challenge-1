import React from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { Action } from "shared/interface/game-tile.interface"

interface Props {
  buttonText: Action
  onBtnClick: (action: Action) => void
  isDisabled?: boolean
}

export const Button: React.FC<Props> = ({ isDisabled = false, buttonText, onBtnClick }) => {
  return (
    <S.Button disabled={isDisabled} onClick={() => onBtnClick(buttonText)}>
      {buttonText}
    </S.Button>
  )
}

const S = {
  Button: styled.button<{ disabled: boolean }>`
    padding: ${Spacing.u3};
    background-color: ${Colors.blue.base};
    opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
    color: ${Colors.white.base};
    margin-left: ${Spacing.u5};
    outline: none;
    border: 0;
    border-radius: ${Spacing.u1};
    min-width: 120px;
  `,
}
