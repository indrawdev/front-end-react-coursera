import React, { Component } from "react";
import {
	Card, CardImg, CardBody, CardText, Button, Modal, ModalHeader, ModalBody,
	Label, Row, Col, CardTitle, Breadcrumb, BreadcrumbItem
} from "reactstrap";

import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length < len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModelOpen: false
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModelOpen: !this.state.isModelOpen
		});
	}

	handleSubmit(values) {
		console.log("Current State is: " + JSON.stringify(values));
		alert("Current State is: " + JSON.stringify(values));
		this.toggleModal();

		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
		this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
	}

	render() {
		return (
			<div>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-edit fa-lg"></span> Submit Comment
				</Button>
				<Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group">
								<Label for="rating" md={12}>Rating</Label>
								<Col md={12}>
									<Control.select model=".rating" name="rating" className="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author" md={12}>Your Name</Label>
								<Col md={12}>
									<Control.text model=".author" id="author" name="author"
										placeholder="Author"
										className="form-control"
										validators={{
											required,
											minLength: minLength(3),
											maxLength: maxLength(15)
										}}
									/>
									<Errors className="text-danger" model=".author" show="touched"
										messages={{
											required: 'Required',
											minLength: 'Should have more than 3 Characters',
											maxLength: 'Should have 15 or less Characters'
										}}
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="feedback" md={12}>Your feedback</Label>
								<Col md={12}>
									<Control.text model=".comment" id="comment" name="comment"
										resize="none"
										rows="12"
										className="form-control"
										validators={{
											required,
										}}
									/>
									<Errors className="text-danger" model=".comment" show="touched"
										messages={{
											required: 'Required'
										}}
									/>
								</Col>
							</Row>
							<Button type="submit" value="submit" color="primary">Submit</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		)
	}
}


function RenderDish({ dish }) {
	if (dish != null) {
		return (
			<FadeTransform
				in
				transformProps={{
					exitTransform: 'scale(0.5) translateY(-50%)'
				}}>
				<Card>
					<CardImg top src={baseUrl + dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			</FadeTransform>
		);
	} else {
		return (
			<div></div>
		);
	}
}

function RenderComments({ comments, postComment, dishId }) {
	//console.log(comments);
	if (comments != null) {
		let list = comments.map((comment) => {
			return (
				<FadeTransform
					in
					transformProps={{
						exitTransform: 'scale(0.5) translateY(-50%)'
					}}>
					<Card>
						<CardImg top src={baseUrl + dish.image} alt={dish.name} />
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</FadeTransform>
			)
		});
		return (
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{list}
				</ul>
			</div>
		);
	} else {
		return (
			<div>
				<p>-</p>
			</div>
		);
	}
}

const DishDetail = (props) => {
	return (
		<div className="container">
			<div className="row">
				<Breadcrumb>
					<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
					<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
				</Breadcrumb>
				<div className="col-12">
					<h3>{props.dish.name}</h3>
					<hr />
				</div>
			</div>
			<div className="row">
				<div className="col-12 col-md-5 m-1">
					<RenderDish dish={props.dish} />
				</div>
				<div className="col-12 col-md-5 m-1">
					<RenderComments comments={props.comments}
						addComment={props.addComment}
						postComment={props.postComment}
						dishId={props.dish.id}
					/>

					<CommentForm dishId={dishId} postComment={postComment} />
				</div>
			</div>
		</div>
	)
}

export default DishDetail;