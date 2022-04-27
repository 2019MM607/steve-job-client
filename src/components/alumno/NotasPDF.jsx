import {  StyleSheet } from '@react-pdf/renderer';
import React from 'react'
import { Document, Page, Text, View,Image } from '../../Helpers/pdfComponents';
import logo from '../../../public/sj.png';


const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
     
    },
    section: {
      marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
      padding: 1,
     flexDirection: 'row',
     justifyContent: 'center',
     borderBottom: '0.3px solid #673ab7'
    },

    title: {
        margin: 20,
        color: '#673ab7',
        fontSize: 15,
    },

    text: {
        margin: 20,
        color: '#673ab7',
        fontSize: 10,
        width: '16.66%',
        textAlign: 'center',
    },


    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    image: {
        
    },

    notas:{
        flexDirection: 'column',
        
        padding: 1,
        justifyContent: 'center',
       
    },
    tr:{
        padding: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
     borderBottom: '0.3px solid #673ab7'

    },

    alumno:{
        width: '100%',
        margin: 20,
        color: '#673ab7',
        fontSize: 10,
        textAlign: 'center',
    }
  });

export const NotasPDF = ({notas,user, periodo}) => {
  return (

   
      <Document>
          <Page size="A4" style={styles.page}>
              <View style={styles.header}>
                  <Text style={styles.title}>Instituto Steve Job</Text>
                  <Image src={logo} style={{ width: 150, height: 75 }} />
              </View>
              <Text style={styles.alumno}>Periodo: {periodo ? periodo : ''}</Text>
              <Text style={styles.alumno}> Alumno: {user ? user.name : ''}</Text>



              <View style={styles.section}>
                  <Text style={styles.text}>Materia</Text>

                  <Text style={styles.text}>Nota 1</Text>
                  <Text style={styles.text}>Nota 2</Text>
                  <Text style={styles.text}>Nota 3</Text>
                  <Text style={styles.text}>Nota final</Text>
                  <Text style={styles.text}>Estado</Text>
              </View>


              <View style={styles.notas}>
                  {
                      notas && notas.map((nota, index) => (
                          <View key={index} style={styles.tr}>


                              <Text style={styles.text}>{nota.materia}</Text>
                              <Text style={styles.text}>{nota.nota_1}</Text>
                              <Text style={styles.text}>{nota.nota_2}</Text>
                              <Text style={styles.text}>{nota.nota_3}</Text>
                              <Text style={styles.text}>{nota.nota_final}</Text>
                              <Text style={styles.text}>{nota.nota_final > 6 ? 'Aprobado' : 'Reprobado'}</Text>



                          </View>

                      ))
                  }
              </View>
          </Page>
      </Document>

  )
}


