export type Direction = "North" | "East" | "West" | "South"

export interface InputValue {
  xValue: number
  yValue: number
  facing: Direction
}

export type Action = "Move" | "Place" | "Left" | "Right" | "Report"
