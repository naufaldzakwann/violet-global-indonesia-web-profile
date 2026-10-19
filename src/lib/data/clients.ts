type Client = {
  id: string;
  name: string;
  logo: string;
  width: number;
  height: number;
};

// Original logos from each institution's official website, kept in their brand colors.
export const clients: Client[] = [
  {
    id: "pemprov-jateng",
    name: "Pemerintah Provinsi Jawa Tengah",
    logo: "/clients/pemprov-jateng.png",
    width: 1436,
    height: 1600,
  },
  {
    id: "mabes-polri",
    name: "Mabes Polri",
    logo: "/clients/mabes-polri.png",
    width: 500,
    height: 497,
  },
  {
    id: "bkk-jateng",
    name: "PT BPR BKK Jateng (Perseroda)",
    logo: "/clients/bkk-jateng.png",
    width: 1400,
    height: 253,
  },
];
