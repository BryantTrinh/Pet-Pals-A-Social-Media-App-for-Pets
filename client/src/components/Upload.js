import { gql, useQuery } from "@apollo/client";

const UPLOADS_QUERY = gql`
	query uploads {
		uploads {
			filename
		}
	}
`;

export default function Uploads() {
	const { data: { uploads = [] } = {} } = useQuery(UPLOADS_QUERY);

	// In this code, a table is being created using the <table> tag, with a header section defined using the <thead> tag and a body section defined using the <tbody> tag. In the header, there is a single table row defined using the <tr> tag and a single table header cell defined using the <th> tag. In the body section, there is a loop that maps over an array of "uploads" and creates a new table row for each upload, using the <tr> tag and a single table data cell for the filename of the upload, defined using the <td> tag. The key attribute on the <tr> tag is a unique identifier for the row, used by React to optimize performance.
  
	return (
		<table>
			<thead>
				<tr>
					<th>Stored file name</th>
				</tr>
			</thead>
			<tbody>
				{uploads.map(({ filename }) => (
					<tr key={filename}>
						<td>{filename}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
