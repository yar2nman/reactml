import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react'

interface Props {
    results:  {className: string,probability: number}[]
}

export const ResultProbability = (props: Props) => {
    let {results} = props;
    const classes = useStyles();
    return (
        <div>


            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Prediction</TableCell>
            <TableCell align='right'>Probability %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row, i) => (
            <TableRow key={i}>
              <TableCell align="left">{row.className}</TableCell>
              <TableCell component="th" scope="row" align='right'>
                {(row.probability * 100).toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    )
}

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
