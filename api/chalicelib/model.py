class model():
    def __init__(self, tables):
        self._trail_ids_table = tables["trail_ids_table_resource"]
        self._bulk_table = tables["bulk_table_resource"]
        self._userid_table = tables["userid_table_resource"]
        self._weather_table = tables["weather_table_resource"]

    def select(self, table_name, key):
        """ Retrieves all of the entries from the table.

        Returns:
            ddb_entries['Items']: A list of dictionaries, each dictionary represents an item.
            String literal: If this is sent then there's been an error.

        Raises:
            A generic exception, prints to STDOUT and returns the string.
        """
        try:
            if table_name == self._trail_ids_table:
                trail_ids = self._trail_ids_table.get_item(
                    Key={
                        'ids': key
                    }
                )

                # Item contains a list of dictionaries representing each item
                if 'Item' not in trail_ids:
                    return None

                return trail_ids['Item']['doc']

            elif table_name == self._bulk_table:
                ddb_bulk_trails = self._bulk_table.get_item(
                    Key={
                        'latlon': key                   
                    }
                )

                if 'Item' not in ddb_bulk_trails:
                    return None

                return ddb_bulk_trails['Item']['doc']

            elif table_name == self._userid_table:
                userid_trails = self._userid_table.get_item(
                    Key={
                        'userid': key
                    }
                )

                if 'Item' not in userid_trails:
                    return None
                
                return userid_trails['Item']['doc']

            elif table_name == self._weather_table:
                weather_info = self._weather_table.get_item(
                    Key={
                        'latlon': key
                    }
                )

                if 'Item' not in weather_info:
                    return None
                
                return weather_info['Item']['doc']

        except Exception as ex:
            print("There's been an error, need to fix this:\n", ex)
            return "It's not you, it's us. :("


    # TODO: Implement timeout so the document is updated after a single day 
    def insert(self, table_name, key, value):
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
            if table_name == self._trail_ids_table:
                self._trail_ids_table.put_item(
                    Item={
                        'ids': key,
                        'doc': value
                    }
                )
            elif table_name == self._bulk_table:
                self._bulk_table.put_item(
                    Item={
                        'latlon': key,
                        'doc': value 
                    }
                )
            elif table_name == self._userid_table:
                self._userid_table.put_item(
                    Item={
                        'userid': key,
                        'doc': value
                    }
                )
            elif table_name == self._weather_table:
                self._weather_table.put_item(
                    Item={
                        'latlon': key,
                        'doc': value
                    }
                )

            return None

        except Exception as ex:
            print("There's been an error, need to fix this\n", ex)
            return "It's not you, it's us. :("

    # TODO UPDATE AND DELETE