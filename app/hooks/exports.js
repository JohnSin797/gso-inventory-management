'use client';

import axios from "axios";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, convertInchesToTwip, AlignmentType, TextRun, WidthType  } from "docx";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";

export default function Exports () {
    const [user, setUser] = useState({})

    useEffect(()=>{
        const getData = async () => {
            await axios.get('/api/user')
            .then(res=>{
                setUser(res.data.data)
            })
        }
        getData()
    }, [])

    const exportARE = (arr, details) => {
        let rearrangedArr = []
        let totalCost = 0
        arr.forEach(element => {
            let row = {}
            row['qty'] = element.quantity
            row['unit'] = element.item.unit
            row['desc'] = element.item.description[0]
            row['pn'] = element.item.property_number
            row['uc'] = element.inventory.unit_cost
            row['total'] = element.inventory.unit_cost * element.quantity
            totalCost += element.inventory.unit_cost * element.quantity
            rearrangedArr.push(row)
            row = {}
            for (let index = 1; index < element.item.description.length; index++) {
                row['qty'] = ''
                row['unit'] = ''
                row['desc'] = element.item.description[index]
                row['pn'] = ''
                row['uc'] = ''
                row['total'] = ''
                rearrangedArr.push(row)
            }
        })
        let tableRows = [
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 12,
                        margins: {
                            top: convertInchesToTwip(0.2),
                            bottom: convertInchesToTwip(0.2),
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({text:'Acknowledgement Receipt for Equipment',size:32})
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({text:'LGU BULAN',size:32})
                                ]
                            })
                        ],
                    }),
                ],
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 6,
                        width: {size: 50, type:WidthType.PERCENTAGE},
                        children: [new Paragraph("Office Department:")],
                    }),
                    new TableCell({
                        columnSpan: 3,
                        children: [new Paragraph("IAR NO.")]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        children: [new Paragraph("ARE NO.")]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 10,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph("QTY")]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 10,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph("UNIT")]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        width: {
                            size: 40,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph("Description")]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 10,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph("Property No.")]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: {
                            size: 15,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph("Unit Cost")]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: {
                            size: 15,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph("Total Amount")]
                    }),
                ]
            }),
        ]
        rearrangedArr.forEach(elm=>{
            console.log(elm)
            const trow = new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 10,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph(elm['qty'].toString())]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 10,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph(elm['unit'])]
                    }),
                    new TableCell({
                        columnSpan: 5,
                        width: {
                            size: 40,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph(elm['desc'])]
                    }),
                    new TableCell({
                        columnSpan: 1,
                        width: {
                            size: 10,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph(elm['pn'])]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: {
                            size: 15,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph(new Intl.NumberFormat("en-US", {
                            style: "decimal",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(elm['uc']))]
                    }),
                    new TableCell({
                        columnSpan: 2,
                        width: {
                            size: 15,
                            type: WidthType.PERCENTAGE
                        },
                        children: [new Paragraph(new Intl.NumberFormat("en-US", {
                            style: "decimal",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(elm['total']))]
                    }),
                ]
            })
            tableRows.push(trow)
        })
        const totalAmountRow = new TableRow({
            children: [
                new TableCell({
                    columnSpan: 1,
                    width: {
                        size: 10,
                        type: WidthType.PERCENTAGE
                    },
                    children: [new Paragraph("")]
                }),
                new TableCell({
                    columnSpan: 1,
                    width: {
                        size: 10,
                        type: WidthType.PERCENTAGE
                    },
                    children: [new Paragraph("")]
                }),
                new TableCell({
                    columnSpan: 5,
                    width: {
                        size: 40,
                        type: WidthType.PERCENTAGE
                    },
                    children: [new Paragraph("")]
                }),
                new TableCell({
                    columnSpan: 1,
                    width: {
                        size: 10,
                        type: WidthType.PERCENTAGE
                    },
                    children: [new Paragraph("")]
                }),
                new TableCell({
                    columnSpan: 2,
                    width: {
                        size: 15,
                        type: WidthType.PERCENTAGE
                    },
                    children: [new Paragraph("TOTAL:")]
                }),
                new TableCell({
                    columnSpan: 2,
                    width: {
                        size: 15,
                        type: WidthType.PERCENTAGE
                    },
                    children: [new Paragraph(new Intl.NumberFormat("en-US", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(totalCost))]
                }),
            ]
        })
        tableRows.push(totalAmountRow)
        const purposeRow = new TableRow({
            children: [
                new TableCell({
                    columnSpan: 12,
                    width: {size: 100, type:WidthType.PERCENTAGE},
                    children: [new Paragraph("Purpose:")],
                }),
            ]
        })
        tableRows.push(purposeRow)
        const signatureRow = new TableRow({
            children: [
                new TableCell({
                    columnSpan: 6,
                    width: {size: 50, type:WidthType.PERCENTAGE},
                    children: [
                        new Paragraph('Received from:'),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: {
                                before: 200
                            },
                            children: [
                                new TextRun({text:details.name,underline:{type:'single'}})
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: {
                                after: 200,
                            },
                            children: [
                                new TextRun('Name')
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({text:details.position,underline:{type:'single'}})
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: {
                                after: 200,
                            },
                            children: [
                                new TextRun('Position')
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({text:new Date().toISOString(),underline:{type:'single'}})
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: {
                                after: 200,
                            },
                            children: [
                                new TextRun('Date')
                            ]
                        }),
                    ],
                }),
                new TableCell({
                    columnSpan: 6,
                    width: {size: 50, type:WidthType.PERCENTAGE},
                    children: [
                        new Paragraph('Received from:'),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: {
                                before: 200
                            },
                            children: [
                                new TextRun({text:user?.first_name+' '+user?.last_name,underline:{type:'single'}})
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: {
                                after: 200,
                            },
                            children: [
                                new TextRun('Name')
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({text:user?.position,underline:{type:'single'}})
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: {
                                after: 200,
                            },
                            children: [
                                new TextRun('Position')
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                                new TextRun({text:new Date().toISOString(),underline:{type:'single'}})
                            ]
                        }),
                        new Paragraph({
                            alignment: AlignmentType.CENTER,
                            spacing: {
                                after: 200,
                            },
                            children: [
                                new TextRun('Date')
                            ]
                        }),
                    ],
                }),
            ]
        })
        tableRows.push(signatureRow)
        const table = new Table({
            alignment: AlignmentType.CENTER,
            width: { size: "100%", type: "auto" },
            rows: tableRows,
        });
        const doc = new Document({
            sections: [{
                margins: {
                    top: convertInchesToTwip(0.2),
                    bottom: convertInchesToTwip(0.2),
                },
                children: [table]
            }]
        })
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, "example.docx");
        });
    }

    return {
        exportARE
    }
}