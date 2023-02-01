import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";

function Match() {
  const { loading, data } = useQuery(QUERY_USER);
  const userLocation = data?.location || "";
  console.log(userLocation);
  userLocation = userLocation.location;
  let matchLocation = useQuery(QUERY_USER());
}

export default Match;
