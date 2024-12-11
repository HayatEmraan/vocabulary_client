import { InputAdornment, styled, TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";

const SearchField = styled(TextField)(() => ({
  width: "100%",
  maxWidth: "250px",
}));

type Props = {
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  ariaLabel?: string;
};

const CtmSearch = (props: Props) => {
  const { searchQuery, handleSearch } = props;
  const { placeholder, ariaLabel } = props;
  return (
    <SearchField
      size="small"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FaSearch />
          </InputAdornment>
        ),
      }}
      value={searchQuery}
      onChange={handleSearch}
      placeholder={placeholder}
      aria-label={ariaLabel}
    />
  );
};

export default CtmSearch;
