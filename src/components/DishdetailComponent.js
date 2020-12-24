import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

	function RenderDish({dish}) {
		if (dish != null) {
			return (
				<div className="col-12 col-md-5 m-1">
					<Card>
						<CardImg top src={dish.image} alt={dish.name} />
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</div>
			);
		} else {
			return(
				<div></div>
			);
		}
	}

function RenderComments({comments}) {
		if (comments != null) {
			let list = comments.map((comment) => { 
				return (
					<li key={comment.id }>
						<div>
							<p>{comment.comment}</p>
							<p>-- {comment.author}, &nbsp;
								{new Intl.DateTimeFormat('en-US', {
									year: 'numeric',
									month: 'short',
									day: '2-digit'
								}).format(new Date(Date.parse(comment.date)))}
							</p>
						</div>
					</li>
				)
			});
			return (
				<div className="col-12 col-md-5 m-1">
					<h4>Comments</h4>
					<ul className="list-unstyled">
						{list}
					</ul>
				</div>
			);
		} else {
			return (
				<div className="col-12 col-md-5 m-1">
					<p>-</p>
				</div>
			);
		}
	}

	const DishDetail = (props) => {
		const dish = props.dish;
		console.log(dish);
		if (dish != null) {
			let dishItem = RenderDish(dish);
			let commentItem = RenderComments(dish.comments)
			return (
				<div className="row">
					{dishItem}
					{commentItem}
				</div>
			)
		} else {
			return (
				<div>----</div>
			)
		}
	}

export default DishDetail;