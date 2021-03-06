import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../../redux/actionCreators/searchCreator";
import SingleProduct from "../components/SingleProduct";
import { AddProductCar } from "../../redux/actionCreators/car";
import { fetchReviews } from "../../redux/actionCreators/reviewCreator";
import ReviewFormContainer from "./ReviewFormContainer";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addToCart: false,
    };
    this.addProdudHandler = this.addProdudHandler.bind(this);
    this.ratingAvg = this.ratingAvg.bind(this);
  }

  ratingAvg() {
    const arr = [];
    const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    arr.push(this.props.reviews.map((review) => review.stars));
    return Math.round(arrAvg(arr[0]));
  }

  componentDidMount() {
    this.props.fetchProduct(Number(this.props.id));
    this.props.fetchReviews(Number(this.props.id));
    this.ratingAvg();
  }
  addProdudHandler(prodId) {
    if (this.props.userId) {
      this.props.AddProductCar(this.props.userId, prodId);
    } else {
      const prod = { ...this.props.product, units: 1 };
      const prueba = JSON.stringify(prod);
      localStorage.setItem(`${prod.name}`, prueba);
    }

    this.setState({ addToCart: true });
  }

  render() {
    return (
      <div>
        <SingleProduct
          pText={this.state.addToCart}
          productSelected={this.props.product}
          addProdudHandler={this.addProdudHandler}
          ratingAvg={this.ratingAvg}
          reviews={this.props.reviews}
        />
        <ReviewFormContainer id={this.props.id} />
      </div>
    );
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    fetchProduct: (id) => {
      dispatch(fetchProduct(id));
    },
    AddProductCar: (userId, prodId) => dispatch(AddProductCar(userId, prodId)),
    fetchReviews: (id) => {
      dispatch(fetchReviews(id));
    },
  };
};

const mapStateToProps = function (state, ownProps) {
  return {
    product: state.products.selectedProduct,
    id: ownProps.match.params.id,
    userId: state.isLogged.logged.id,
    reviews: state.reviews.reviews,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
