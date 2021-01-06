import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderMenuItem({ dish }) {
	return (
		<Card>
			<Link to={`/menu/${dish.id}`}>
				<CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
				<CardImgOverlay>
					<CardTitle>{dish.name}</CardTitle>
				</CardImgOverlay>
			</Link>
		</Card>
	);
}


const Menu = (props) => {
	console.log(props)

	const menu = props.dishes.dishes.map((dish) => {
		if (props.dishes.isLoading) {
			return (
				<div className="container">
					<div className="row">
						<Loading />
					</div>
				</div>
			);
		}
		else if (props.dishes.errMess) {
			return (
				<div className="container">
					<div className="row">
						<div className="col-12">
							<h4>{props.dishes.errMess}</h4>
						</div>
					</div>
				</div>
			);
		}
		else { 
			return (
				<div className="col-12 col-md-5 m-1" key={dish.id}>
					<RenderMenuItem dish={dish} onClick={props.onClick} />
				</div>
			);
		}
	});

	return (
		<div className="container">
			<div className="row">
				{menu}
			</div>
		</div>
	);
}

export default Menu;