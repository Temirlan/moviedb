import React from 'react';
import { Box, FormControl, Input, Button, Flex, FormHelperText } from '@chakra-ui/react';
import { Field, FieldAttributes, Form, Formik, FormikHelpers } from 'formik';

export interface SearchFormValues {
  search: string;
}

interface Props {
  onSubmit: (
    values: SearchFormValues,
    formikHelpers: FormikHelpers<SearchFormValues>,
  ) => Promise<void>;
  initialValues: SearchFormValues;
}

const SearchForm: React.FC<Props> = ({ onSubmit, initialValues }) => {
  return (
    <Box p={10}>
      <Formik<{ search: string }> initialValues={initialValues} onSubmit={onSubmit}>
        {(props) => (
          <Form>
            <Flex>
              <Field name="search">
                {({ field }: FieldAttributes<any>) => (
                  <FormControl>
                    <Input {...field} id="search" placeholder="Search..." />
                    <FormHelperText>Find the movie you want by title.</FormHelperText>
                  </FormControl>
                )}
              </Field>
              <Button
                ml={5}
                alignSelf="flex-start"
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit">
                Submit
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SearchForm;
