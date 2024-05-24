"use client";

import { useFhirSearch } from "@bonfhir/query/r4b"
import { FhirPagination, FhirQueryLoader, FhirTable, FhirValue, useFhirSearchController } from "@bonfhir/react/r4b";
import { Group, ScrollArea, Stack, Table, Text } from "@mantine/core";
import classes from './PatientsTable.module.css';
import cx from 'clsx';
import { useState } from "react";
import { PatientSortOrder } from "@bonfhir/core/r4b";




const PatientsTable: FC<PatientReportsTableProps> = (): ReactElement => {
    const searchController = useFhirSearchController<PatientSortOrder>({
      pageSize: 5,
    });

    const [scrolled, setScrolled] = useState(false);


    const patientsSearchQuery = useFhirSearch("Patient",
    (search) =>
        search
          ._count(searchController.pageSize)
          ._total("accurate"),
      searchController.pageUrl,
    );

    


    return (
        <>

            
            {/* <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)} p={10}> */}
                {/* <Table miw={700}>
                    <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                    </Table.Thead>
            </Table> */}
            <FhirQueryLoader query={patientsSearchQuery}>
            <FhirTable
                {...patientsSearchQuery}
                {...searchController}
                onRowNavigate={(patient) => `/sandbox/patient${patient.id}/`}
                columns={[
                    {
                        key: 'name',
                        title: 'Name',
                        render: (patient) => (
                            <FhirValue type="HumanName" value={patient.name} />
                          ),
                    },
                    {
                        key: 'birthday',
                        title: 'Birthday',
                        render: (patient) => (
                            <FhirValue type="date" value={patient.birthDate} />
                          ),
                    }
                ]}
                />
                <FhirPagination {...patientsSearchQuery} {...searchController} ></FhirPagination>
                
            </FhirQueryLoader>
               

            {/* </ScrollArea> */}

        </>
    )
}

export default PatientsTable;