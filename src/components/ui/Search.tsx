import { Box, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  return (
    <Box
      sx={{
        bgcolor: "#e4e4e4",
        borderRadius: 1.5,
        my: 4,
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "fit-content",
        pr: 6,
        pl: 1,
      }}>
      <SearchIcon />
      <Input disableUnderline placeholder="Search for anything ..." />
    </Box>
  );
};

export default Search;
