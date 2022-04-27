import "../scss/main.scss";
import { initialState } from "./services";
import select from "./components/filterSelect/select";
import mainSearch from "./mainSearch";

initialState();

select();

mainSearch();
