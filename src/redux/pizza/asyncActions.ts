import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { Pizza, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: SearchPizzaParams) => {
    const { category, search, sortBy, order, currentPage } = params;

    const { data } = await axios.get<Pizza[]>(`https://62987937f2decf5bb74365d0.mockapi.io/items`, {
      params: pickBy(
        {
          page: currentPage,
          limit: 4,
          category,
          sortBy,
          order,
          search,
        },
        identity,
      ),
    });
    return data;
  }
)