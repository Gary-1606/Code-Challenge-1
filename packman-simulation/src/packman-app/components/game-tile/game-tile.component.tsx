import React, { useState, SetStateAction } from "react"
import styled from "styled-components"
import { Direction, InputValue, Action } from "shared/interface/game-tile.interface"
import { Spacing } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { Button } from "shared/components/button/button.component"
import { directionChanges } from "shared/constants/direction-constant"
import { Alert } from "shared/components/alert/alert.component"

export const GameTile: React.FC = () => {
  const [inputValues, setInputValues] = useState<InputValue>({
    xValue: 0,
    yValue: 0,
    facing: "North",
  })
  const [xPos, setXPos] = useState<number>()
  const [yPos, setYPos] = useState<number>()
  const [direction, setDirection] = useState<Direction>()
  const [error, setError] = useState<string | null>()
  const [isActionBtnDisabled, SetIsActionBtnDisabled] = useState<boolean>(true)
  const [commands, setCommands] = useState<Array<string>>([])
  const [isReport, SetIsReport] = useState<boolean>(false)

  const inputsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetIsActionBtnDisabled(true)
    setInputValues({ ...inputValues, [e.target.name]: parseInt(e.target.value) })
  }

  const selectionHandler = (e: any) => {
    SetIsActionBtnDisabled(true)
    setInputValues({
      ...inputValues,
      facing: e.target.value,
    })
  }

  const onActionBtnClick = (action: Action) => {
    setError(null)
    SetIsReport(false)
    let updatedCommands = [...commands]

    if (action === "Place") {
      const actionComment = `${action} ${inputValues.xValue} ${inputValues.yValue} ${inputValues.facing}`
      updatedCommands.push(actionComment)
      if (inputValues.xValue < 0 || inputValues.xValue > 4 || inputValues.yValue < 0 || inputValues.yValue > 4) {
        setError("You have placed your pacman outside the grid area. Please change your input values.")
      } else {
        setXPos(inputValues.xValue)
        setYPos(inputValues.yValue)
        setDirection(inputValues.facing)
        SetIsActionBtnDisabled(false)
      }
      setCommands(updatedCommands)
      return
    }
    if (action === "Move") {
      updatedCommands.push(action)
      if ((direction === "West" || direction === "East") && xPos !== undefined) {
        if ((xPos === 0 && direction === "West") || (xPos === 4 && direction === "East")) {
          setError("This move will make your pacmac fall out of the grid. So, please do a different action")
        } else {
          if (direction === "East") setXPos(xPos + 1)
          else setXPos(xPos - 1)
        }
      }
      if ((direction === "North" || direction === "South") && yPos !== undefined) {
        if ((yPos === 0 && direction === "South") || (yPos === 4 && direction === "North")) {
          setError("This move will make your pacmac fall out of the grid. So, please do a different action")
        } else {
          if (direction === "North") setYPos(yPos + 1)
          else setYPos(yPos - 1)
        }
      }
      setCommands(updatedCommands)
      return
    }
    if ((action === "Left" || action === "Right") && direction !== undefined) {
      updatedCommands.push(action)
      setDirection(directionChanges[direction][action] as SetStateAction<Direction | undefined>)
      setCommands(updatedCommands)
      return
    }
    if (action === "Report") {
      updatedCommands.push(action)
      SetIsReport(true)
      setCommands(updatedCommands)
      return

    }
  }

  const renderCommands = (commands: Array<string>) => {
    return commands.map((command, i) => {
      return <li key="i">{command}</li>
    })
  }

  return (
    <S.GameTileContainer>
      <S.InputContainer>
        <S.Input type="number" name="xValue" onChange={inputsHandler} placeholder="X Position" value={inputValues?.xValue} />
        <S.Input type="number" name="yValue" onChange={inputsHandler} placeholder="Y Position" value={inputValues?.yValue} />
        <S.Select value={inputValues?.facing} onChange={selectionHandler}>
          <option value="North">North</option>
          <option value="East">East</option>
          <option value="West">West</option>
          <option value="South">South</option>
        </S.Select>
        <Button buttonText="Place" onBtnClick={onActionBtnClick} />
      </S.InputContainer>
      {xPos !== undefined && yPos !== undefined && direction !== undefined && <S.Div>{`Current position: ${xPos}, ${yPos}, ${direction}`}</S.Div>}

      {error && <Alert isError message={error} />}
      {isReport && <Alert message={`Your pacman has reached the destination and is at ${xPos}, ${yPos} and is facing ${direction}`} />}
      <S.ActionsContainer>
        <Button isDisabled={isActionBtnDisabled} buttonText="Move" onBtnClick={onActionBtnClick} />
        <Button isDisabled={isActionBtnDisabled} buttonText="Left" onBtnClick={onActionBtnClick} />
        <Button isDisabled={isActionBtnDisabled} buttonText="Right" onBtnClick={onActionBtnClick} />
        <Button isDisabled={isActionBtnDisabled} buttonText="Report" onBtnClick={onActionBtnClick} />
      </S.ActionsContainer>
      {commands && commands.length > 0 ? <S.CommandContainer>{renderCommands(commands)}</S.CommandContainer> : null}
    </S.GameTileContainer>
  )
}

const S = {
  GameTileContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: ${Spacing.u4};
    border: 1px solid ${Colors.dark.lighter};
  `,
  InputContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: ${Spacing.u4};
  `,
  Input: styled.input`
    padding: ${Spacing.u2};
    margin-right: 20px;
    border: 1px solid ${Colors.dark.lighter};
  `,
  Select: styled.select`
    width: 150px;
  `,
  ActionsContainer: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: ${Spacing.u4};
  `,
  CommandContainer: styled.ul`
    text-align: left;
  `,
  Div: styled.div`
    margin-bottom: ${Spacing.u4};
    font-weight: bold;
  `,
}
