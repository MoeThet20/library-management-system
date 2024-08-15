import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { Colors } from "@/const/colors";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      value={value}
      onChange={onChange}
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: Colors.primary_color, // Default border color
          },
          "&.Mui-focused fieldset": {
            borderColor: Colors.primary_color, // Border color when focused
          },
          color: Colors.primary_color,
          width: 500,
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon sx={{ color: Colors.primary_color }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
