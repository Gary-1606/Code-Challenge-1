import React from "react"
import { CenteredContainer } from "shared/components/centered-container.component"
import { GameTile } from "packman-app/components/game-tile/game-tile.component"

export const HomeBoardPage: React.FC = () => {
  return (
    <>
      <h2>Welcome to the PACKMAN GAME !!!</h2>
      <CenteredContainer>
        <GameTile />
      </CenteredContainer>
    </>
  )
}
