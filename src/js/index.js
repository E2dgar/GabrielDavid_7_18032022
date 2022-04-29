import "../scss/main.scss";
import { initialState } from "./services";
import select from "./components/filterSelect/select";
import search from "./search";

initialState();

select();

search();
