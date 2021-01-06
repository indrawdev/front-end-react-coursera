import React from 'react';
import {
	Card, CardImg, CardBody, CardText, CardSubtitle, CardTitle,
} from "reactstrap";

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderCard({ item, isLoading, errMess }) {
	if (isLoading) {
		return (
			<Loading />
		);
	}
	else if (errMess) {
		return (
			<h4>{errMess}</h4>
		);
	}
	else {
		return (
			<Card>
				<CardImg src={baseUrl + item.image} alt={item.name} />
				<CardBody>
					<CardTitle>{item.name}</CardTitle>
					{item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
					<CardText>{item.description}</CardText>
				</CardBody>
			</Card>
		);
	}
}


function Home(props) {
	return (
		<RenderCard item={props.promotion} isLoading={props.promoLoading} errMess={props.promoErrMess} />
	);
}

export default Home;   