'use client';

import axios from "axios";
import { Document, Packer, Paragraph, Table, TableRow, TableCell, convertInchesToTwip, AlignmentType, TextRun, WidthType, ShadingType  } from "docx";
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

    const addTable = (rows, arr, details, purpose) => {
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
            rows.push(trow)
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
        rows.push(totalAmountRow)
        const purposeRow = new TableRow({
            children: [
                new TableCell({
                    columnSpan: 12,
                    width: {size: 100, type:WidthType.PERCENTAGE},
                    children: [new Paragraph("Purpose: "+purpose)],
                }),
            ]
        })
        rows.push(purposeRow)
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
        rows.push(signatureRow)
        return rows
    }

    const exportARE = (arr, details, purpose) => {
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
                        children: [new Paragraph("Office Department:"+details.department)],
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
        tableRows = addTable(tableRows,arr,details,purpose)
        const table = new Table({
            alignment: AlignmentType.CENTER,
            width: { size: "100%", type: "auto" },
            rows: tableRows,
        });
        const doc = new Document({
            sections: [{
                children: [table]
            }]
        })
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, details.name+"-ARE.docx");
        });
    }

    const exportICS = (arr, details, purpose) => {
        const title = new TextRun({text:'INVENTORY CUSTODIAN SLIP',color:'FFFFFF', size:48})
        let tableRows = [
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 12,
                        shading: {
                            fill: "FF0000",
                            type: ShadingType.CLEAR,
                            color: "FFFFFF",
                        },
                        margins: {
                            top: convertInchesToTwip(0.2),
                            bottom: convertInchesToTwip(0.2),
                        },
                        children: [
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [title]
                            }),
                        ]
                    })
                ]
            }),
            new TableRow({
                children: [
                    new TableCell({
                        columnSpan: 6,
                        width: {size: 50, type:WidthType.PERCENTAGE},
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: 'Office/Department: '+details.department
                                    }),
                                    new TextRun({
                                        text: 'department',
                                        color: 'FF0000'
                                    })
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        width: {size: 25, type:WidthType.PERCENTAGE},
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('IAR NO: '),
                                    new TextRun('iar')
                                ]
                            })
                        ]
                    }),
                    new TableCell({
                        columnSpan: 3,
                        width: {size: 25, type:WidthType.PERCENTAGE},
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun('ICS NO: '),
                                    new TextRun('ics')
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
        tableRows = addTable(tableRows, arr, details, purpose)
        const table = new Table({
            alignment: AlignmentType.CENTER,
            width: { size: "100%", type: "auto" },
            rows: tableRows,
        });
        const doc = new Document({
            sections: [{
                children: [table]
            }]
        })
        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, details.name+"-ICS.docx");
        });
    }

    return {
        exportARE, exportICS
    }
}