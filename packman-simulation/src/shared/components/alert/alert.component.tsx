import React from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"

interface Props {
  message: string
  isError?: boolean
}

export const Alert: React.FC<Props> = ({ isError = false, message }) => {
  return <S.Container isError={isError}>{message}</S.Container>
}

const S = {
  Container: styled.div<{ isError: boolean }>`
    padding: ${Spacing.u4};
    color: ${Colors.white.base};
    border-radius: ${Spacing.u1};
    background-color: ${({ isError }) => (isError ? Colors.red.lighter : Colors.green.base)};
    margin-bottom: ${Spacing.u4};
  `,
}
