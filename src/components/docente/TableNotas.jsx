import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useState } from 'react'

export const TableNotas = ({notas}) => {

  


 
  return (
    <TableContainer component={Paper}>
    <Table  aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Materia</TableCell>
          <TableCell align="center">Nota 1</TableCell>
          <TableCell align="center">Nota 2</TableCell>
          <TableCell align="center">Nota 3</TableCell>
          <TableCell align="center">Nota Final</TableCell>
        </TableRow>
      </TableHead>
      {
          notas && 
          <TableBody>
        {notas && notas.map((nota) => (
          <TableRow key={nota.materia}>
            <TableCell component="th" scope="row">
              {nota.materia}
            </TableCell>
            <TableCell align="center">{nota.nota_1}</TableCell>
            <TableCell align="center">{nota.nota_2}</TableCell>
            <TableCell align="center">{nota.nota_3}</TableCell>
            <TableCell align="center">{nota.nota_final}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      }
      
    </Table>
  </TableContainer>
  )
}
