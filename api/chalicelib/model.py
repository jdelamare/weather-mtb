class model():
    def __init__(self, table_resource):
        self._table = table_resource

    def select(self, lat_lon):
        """ Retrieves all of the entries from the table.

        Returns:
            ddb_entries['Items']: A list of dictionaries, each dictionary represents an item.
            String literal: If this is sent then there's been an error.

        Raises:
            A generic exception, prints to STDOUT and returns the string.
        """
        try:
            ddb_bulk_trails = self._table.get_item(
                Key={
                    'latlon': lat_lon                   
                }
            )
            # Item contains a list of dictionaries representing each item
            if 'Item' not in ddb_bulk_trails:
                return None

            return ddb_bulk_trails['Item']['doc']
        except Exception as ex:
            print("There's been an error, need to fix this:\n", ex)
            return "It's not you, it's us. :("


    # TODO: Implement timeout so the document is updated after a single day 
    def insert(self, latlon, doc):
        """ Inserts the pararms into the database.
        Args:
            latlon (String): The key in the table
            document (String): The entire response from the various applications.
        
        Returns:
            None: If the insertion was successful
            String literal: If the insertion failed, possibly due to lack of credentials

        Raises:
            A generic exception, prints to STDOUT and returns the string.
        """
        try:
            self._table.put_item(
                Item={
                    'latlon': latlon,
                    'doc': doc
                }
            )

            return None

        except Exception as ex:
            print("There's been an error, need to fix this\n", ex)
            return "It's not you, it's us. :("

    # TODO UPDATE AND DELETE