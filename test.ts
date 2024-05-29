SELECT
    DECODE(
        CASE 
            WHEN LENGTH(AU.CAPITAL_AS_OF_DATE) = 8 
                 AND REGEXP_LIKE(AU.CAPITAL_AS_OF_DATE, '^[0-9]{8}$')
            THEN
                CASE
                    WHEN TO_DATE(SUBSTR(AU.CAPITAL_AS_OF_DATE, 1, 4) || '-' || 
                                 SUBSTR(AU.CAPITAL_AS_OF_DATE, 5, 2) || '-' || 
                                 SUBSTR(AU.CAPITAL_AS_OF_DATE, 7, 2), 'YYYY-MM-DD') IS NOT NULL
                    THEN 1
                    ELSE 0
                END
            ELSE 0
        END,
        1, 
        To_Char(TO_DATE(AU.CAPITAL_AS_OF_DATE, 'YYYYMMDD'), 'DD-Mon-YYYY'), 
        NULL
    ) AS formatted_date
FROM YourTable;
