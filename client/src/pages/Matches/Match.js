import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

function Match() {
  let userLocation = useQuery(QUERY_USER);
  console.log(userLocation);
  userLocation = userLocation.location
  let matchLocation = useQuery(QUERY_USER())
}

export default Match;
