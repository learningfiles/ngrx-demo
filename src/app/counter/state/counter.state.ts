export interface CounterState {
  counter: number;
  counterName: string;
}

export const initialState: CounterState = {
  counter: 0,
  counterName: 'counter-1'
};
