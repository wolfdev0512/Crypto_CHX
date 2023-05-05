import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { getDashboardApi } from "../../api";

const date = new Date();
date.setDate(new Date().getDate() + 1);

const initialState = {
  id: "",
  user: "",
  token_sale_countdown: date,
  primary_mail: "",
  whitepaper_url: "",
  docs_url: "",
  display_team_section: false,
  announcements: {
    title: "",
    description: "",
    image_url: "",
    display: false,
  },
};

export const DashboardContext = createContext({
  ...initialState,
  isLoading: true,
});

const DashboardContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [adminData, setAdminData] = useState(initialState);
  const [isLoading, setLoading] = useState(true);

  const handleGetData = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data: { data },
      } = await getDashboardApi();
      setAdminData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);
  return (
    <DashboardContext.Provider value={{ ...adminData, isLoading }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
