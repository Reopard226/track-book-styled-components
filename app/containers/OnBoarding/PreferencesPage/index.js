/**
 * Success Page
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Progress } from 'react-sweet-progress';
import LineTo from 'react-lineto';
import styled from 'styled-components';
import { fetchPreferences } from '../../../actions/onBoardingAction';
import { StepHeader, StepContent, StepFooter, Circle } from '../components';
import {
  StyledRow,
  StyledCol,
  H1,
  H2,
  StyledCheckbox,
  StyledP,
  Container,
  StyledPrimaryButton,
  StyledNormalButton,
  StyledSelect,
  FlexContainer,
  FlexEndContainer,
  FlexRowContainer,
  PaddedContainer,
  FlexStartContainer,
  PositionedRelativeContainer,
  ErrorText,
} from '../../../components';
import 'react-sweet-progress/lib/style.css';
import RingImage from '../../../assets/images/ring.png';
import PaymentHowToImage from '../../../assets/images/payment_howto.png';

import {
  PrefPositionedRelativeContainer,
  PaymentHowToimg,
  RingImg,
} from './styles';
const FirstCircle = styled(Circle)`
  top: 40px;
  right: -27px;
`;
const SecondCircle = styled(Circle)`
  top: 15%;
  left: 14%;
`;

const settingsSchema = Yup.object().shape({
  bankAccounts: Yup.string().required('BankAccounts must be provided'),
  paymentMethods: Yup.string().required('Payment Methods must be provided'),
  taxCodes: Yup.string().required('Tax Codes must be provided'),
  products: Yup.string().required('Products must be provided'),
  zeroTaxCodes: Yup.string().required('Zero Tax Codes must be provided'),
  productCheck: Yup.bool().oneOf([true], 'Must Check Product'),
  taxableCheck: Yup.bool().oneOf([true], 'Must Check Tax'),
});

class PreferencesPage extends React.Component {
  state = {
    firstPoint: {
      x: 0,
      y: 0,
    },
    secondPoint: {
      x: 0,
      y: 0,
    },
  };

  componentDidMount() {
    this.setState({
      firstPoint: {
        x: this.first.getBoundingClientRect().x,
        y: this.first.getBoundingClientRect().y,
      },
      secondPoint: {
        x: this.second.getBoundingClientRect().x,
        y: this.second.getBoundingClientRect().y,
      },
    });
    const { fetchPreferences_ } = this.props;
    fetchPreferences_();
  }

  render() {
    const { history } = this.props;
    let { bankAccounts, paymentMethods, products, taxCodes } = this.props;
    bankAccounts = bankAccounts.map(item => ({
      label: item.name,
      value: item.name,
    }));
    paymentMethods = paymentMethods.map(item => ({
      label: item.name,
      value: item.name,
    }));
    products = products.map(item => ({ label: item.name, value: item.name }));
    taxCodes = taxCodes.map(item => ({ label: item.name, value: item.name }));
    return (
      <Container height="100vh">
        <svg style={{ position: 'absolute' }}>
          <line
            x1={this.state.firstPoint.x}
            y1={this.state.firstPoint.y}
            x2={this.state.secondPoint.x}
            y2={this.state.secondPoint.y}
          />
        </svg>
        <StyledRow>
          <StyledCol xs={12} md={8}>
            <Formik
              validationSchema={settingsSchema}
              onSubmit={() => {
                history.push('/transactions');
              }}
              enableReinitialize
              initialValues={{
                bankAccounts: '',
                paymentMethods: '',
                productCheck: false,
                products: '',
                taxableCheck: false,
                taxCodes: '',
                zeroTaxCodes: '',
              }}
              render={({
                errors,
                values,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
              }) => (
                <FlexContainer>
                  <StepHeader>
                    <FlexRowContainer>
                      <H2>TrackBook</H2>
                      <FlexRowContainer>
                        <StyledP fontSize="12px" margin="0 5px 0 0">
                          2 of 3
                        </StyledP>
                        <Progress
                          theme={{
                            success: {
                              symbol: ' ',
                              trailColor: '#f4f5f8',
                              color: '#52ae46',
                            },
                          }}
                          percent={66}
                          status="success"
                        />
                      </FlexRowContainer>
                    </FlexRowContainer>
                    <FlexStartContainer>
                      <StyledP
                        fontSize="12px"
                        color="#b0b3b8"
                        margin="8px 0 0 0"
                      >
                        Acknow a/c:
                      </StyledP>
                      <StyledP fontSize="12px" margin="8px 6px 0 3px">
                        Nexus Infotech Ltd.
                      </StyledP>
                      <RingImg src={RingImage} alt="Ring" />
                      <StyledP
                        fontSize="12px"
                        color="#b0b3b8"
                        margin="8px 0 0 6px"
                      >
                        Fusion a/c:
                      </StyledP>
                      <StyledP fontSize="12px" margin="8px 0 0 3px">
                        Nexus
                      </StyledP>
                    </FlexStartContainer>
                  </StepHeader>
                  <StepContent>
                    <PaddedContainer margin="0 120px 0 0">
                      <H1>Manage your sales preferences</H1>
                      <PaddedContainer padding="8px 0">
                        <StyledP>Bank account to deposit sales/income</StyledP>
                        <StyledSelect
                          className="single-select"
                          classNamePrefix="react-select"
                          options={bankAccounts}
                          placeholder="Select"
                          id="bankAccounts"
                          onBlur={() => setFieldTouched('bankAccounts', true)}
                          onChange={value =>
                            setFieldValue('bankAccounts', value.label)
                          }
                        />
                        {errors.bankAccounts && (
                          <ErrorText title={errors.bankAccounts} />
                        )}
                      </PaddedContainer>
                      <PaddedContainer padding="8px 0">
                        <PrefPositionedRelativeContainer>
                          <StyledP>Select your payment method</StyledP>
                          <StyledSelect
                            className="single-select"
                            classNamePrefix="react-select"
                            options={paymentMethods}
                            placeholder="Select"
                            id="paymentMethods"
                            onBlur={() =>
                              setFieldTouched('paymentMethods', true)
                            }
                            onChange={value =>
                              setFieldValue('paymentMethods', value.label)
                            }
                          />
                          {errors.paymentMethods && (
                            <ErrorText title={errors.paymentMethods} />
                          )}
                          <FirstCircle
                            className="A"
                            size="11px"
                            ref={ref => {
                              this.first = ref;
                            }}
                          />

                          <LineTo
                            from="A"
                            to="B"
                            borderColor="#8dd1fd"
                            borderStyle="dashed"
                          />
                        </PrefPositionedRelativeContainer>
                      </PaddedContainer>
                      <PaddedContainer margin="8px 0">
                        <StyledCheckbox
                          isFullWidth
                          label="Apply default product/service?"
                          value="Apply default product/service?"
                          // onChange={this.onChange}
                          name="checkbox-checked"
                          id="productCheck"
                          onBlur={() => setFieldTouched('productCheck', true)}
                          onChange={() =>
                            setFieldValue('productCheck', !values.productCheck)
                          }
                        />
                        {errors.productCheck && (
                          <ErrorText title={errors.productCheck} />
                        )}
                      </PaddedContainer>
                      <PaddedContainer padding="8px 0">
                        <StyledP>Record default product/ service as</StyledP>
                        <StyledSelect
                          className="single-select"
                          classNamePrefix="react-select"
                          options={products}
                          placeholder="Select"
                          id="products"
                          onBlur={() => setFieldTouched('products', true)}
                          onChange={value =>
                            setFieldValue('products', value.label)
                          }
                        />
                        {errors.products && (
                          <ErrorText title={errors.products} />
                        )}
                      </PaddedContainer>
                      <PaddedContainer margin="8px 0">
                        <StyledCheckbox
                          isFullWidth
                          label="Make transaction taxable"
                          value="Make transaction taxable"
                          // onChange={this.onChange}
                          name="checkbox-checked"
                          id="taxableCheck"
                          onBlur={() => setFieldTouched('taxableCheck', true)}
                          onChange={() =>
                            setFieldValue('taxableCheck', !values.taxableCheck)
                          }
                        />
                        {errors.taxableCheck && (
                          <ErrorText title={errors.taxableCheck} />
                        )}
                      </PaddedContainer>
                      <StyledRow style={{ height: 'auto' }}>
                        <StyledCol xs={12} md={6}>
                          <PaddedContainer padding="8px 4px 8px 0">
                            <StyledP>Default Tax code</StyledP>
                            <StyledSelect
                              className="single-select"
                              classNamePrefix="react-select"
                              options={taxCodes}
                              placeholder="Select"
                              id="taxCodes"
                              onBlur={() => setFieldTouched('taxCodes', true)}
                              onChange={value =>
                                setFieldValue('taxCodes', value.label)
                              }
                            />
                            {errors.taxCodes && (
                              <ErrorText title={errors.taxCodes} />
                            )}
                          </PaddedContainer>
                        </StyledCol>
                        <StyledCol xs={12} md={6}>
                          <PaddedContainer padding="8px 0 8px 4px">
                            <StyledP>Zero rated tax code:</StyledP>
                            <StyledSelect
                              className="single-select"
                              classNamePrefix="react-select"
                              options={[
                                { label: 'Adelaide', value: 'adelaide' },
                                { label: 'Brisbane', value: 'brisbane' },
                              ]}
                              placeholder="Choose a City"
                              id="zeroTaxCodes"
                              onBlur={() =>
                                setFieldTouched('zeroTaxCodes', true)
                              }
                              onChange={value =>
                                setFieldValue('zeroTaxCodes', value.label)
                              }
                            />
                            {errors.zeroTaxCodes && (
                              <ErrorText title={errors.zeroTaxCodes} />
                            )}
                          </PaddedContainer>
                        </StyledCol>
                      </StyledRow>
                    </PaddedContainer>
                  </StepContent>
                  <StepFooter>
                    <FlexEndContainer margin="0 46px 0 0">
                      <StyledNormalButton
                        appearance="default"
                        onClick={() => history.push('/success')}
                      >
                        Back
                      </StyledNormalButton>
                      <StyledPrimaryButton
                        appearance="primary"
                        onClick={handleSubmit}
                      >
                        Next
                      </StyledPrimaryButton>
                    </FlexEndContainer>
                  </StepFooter>
                </FlexContainer>
              )}
            />
          </StyledCol>
          <StyledCol xs={12} md={4}>
            <PositionedRelativeContainer backgroundColor="#f4f5f8">
              <StyledP fontSize="20px" margin="43px 12.4%" color="#393a3d">
                Here it is how it looks like in Acknow
              </StyledP>
              <StyledP fontSize="14px" margin="65px 12.4% 13px" color="#393a3d">
                Choose the method you have chosen in your Acknow account
              </StyledP>
              <PositionedRelativeContainer>
                <FlexEndContainer>
                  <SecondCircle
                    className="B"
                    size="11px"
                    ref={ref => {
                      this.second = ref;
                    }}
                  />
                  <PaymentHowToimg
                    src={PaymentHowToImage}
                    alt="Payment How to"
                  />
                </FlexEndContainer>
              </PositionedRelativeContainer>
            </PositionedRelativeContainer>
          </StyledCol>
        </StyledRow>
      </Container>
    );
  }
}

PreferencesPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  fetchPreferences_: PropTypes.func,
  bankAccounts: PropTypes.array,
  products: PropTypes.array,
  paymentMethods: PropTypes.array,
  taxCodes: PropTypes.array,
};

const mapStateToProps = state => ({
  bankAccounts: state.preferences.bankAccounts,
  products: state.preferences.products,
  paymentMethods: state.preferences.paymentMethods,
  taxCodes: state.preferences.taxCodes,
});

const mapDispatchToProps = dispatch => ({
  fetchPreferences_: () => {
    dispatch(fetchPreferences());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreferencesPage);
