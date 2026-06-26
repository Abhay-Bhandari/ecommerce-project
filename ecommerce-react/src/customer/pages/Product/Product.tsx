import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useAppDispatch, useApppSelector } from "../../../State/store";
import { fetchAllProducts } from "../../../State/customer/ProductSlice";
import { useParams, useSearchParams } from "react-router";
function Product() {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const { product } = useApppSelector((store) => store);

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const color = searchParams.get("color");
    const pageNumber = page - 1;
    const minDiscount = searchParams.get("discount")
      ? Number(searchParams.get("discount"))
      : undefined;
    const newFilter = {
      color: color || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      pageNumber,
      minDiscount,
    };

    dispatch(fetchAllProducts({ newFilter }));
  }, [category, searchParams]);

  return (
    <div>
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 mt-10 px-9 uppercase space-x-2 ">
          women sarees
        </h1>
      </div>

      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-[20%] ">
          <FilterSection />
        </section>
        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex items-center justify-between px-9 h-[40px] ">
            <div className="relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}

              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>

            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Age"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Price: Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price: High - Low</MenuItem>
                <MenuItem value={"rating"}>Rating</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <section className="product_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5">
            {product.proudcts.map((item) => (
              <ProductCard item={item} />
            ))}
          </section>
          <div className="flex justify-center py-10">
            <Pagination
              count={10}
              variant="outlined"
              onChange={(e, value) => handlePageChange(value)}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
