SELECT 
    dcode(date_column, 
          '00000' null, 
          CASE
              WHEN date_column IS NOT NULL AND LENGTH(date_column) = 8 THEN 
                  TO_CHAR(TO_DATE(date_column, 'YYYYMMDD'), 'DD-Mon-YYYY')
              ELSE 
                  'Invalid Date'
          END
    )
FROM your_table;
