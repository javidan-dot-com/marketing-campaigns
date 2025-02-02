export type Campaign = {
  id: string;
  title: string;
  url: string;
  status: boolean;
  payouts: {
    country: string;
    amount: number;
  }[];
};
