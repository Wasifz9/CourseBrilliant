import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function createData(code, name, campus, description, department, status) {
	return { code, name, campus, description, department, status, };
}

const rows = [
	createData('ECE344', 'Operating system', '1', 'A', 'E', 'Added'),
	createData('ECE345', 'Algorithm', '1', 'A', 'E', 'Add to cart'),
  ];


export default function Recommendation() {
	return (
        <div>
        <h2>Check our recommendations!</h2>
        <Button component={Link} to={"../BluePrint"} sx={{width: '20%' }}>Return to my blueprint</Button>
            <div>
            <TableContainer>
                <Table sx={{ maxWidth: 750 }} aria-label="recommendation">
                    <TableHead>
                    <TableRow>
                        <TableCell>course code</TableCell>
                        <TableCell align="right">course name</TableCell>
                        <TableCell align="right">campus</TableCell>
                        <TableCell align="right">course description</TableCell>
                        <TableCell align="right">department</TableCell>
                        <TableCell align="right">status</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.code}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.code}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.campus}</TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                        <TableCell align="right">{row.department}</TableCell>
                        <TableCell align="right">
                            <Button>
                            {row.status}
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        </div>
    );	
}