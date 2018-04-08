import { h, Component } from 'preact';

import 'font-awesome/css/font-awesome.min.css'

import Calendar from './calendar';
import Month from './month';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	state = {
		selectedMonth: '',
		events: [{ eventDate: "2018-June-9", eventText: "Birthday", color: "#00ffff" }]
	}
	selectMonth = selectedMonth => {
		this.setState({
			selectedMonth
		})
	}
	returnHome() {
		this.setState({
			selectedMonth: ''
		})
	}
	handleUpdateEvents = (newEvents) => {
		let { events } = this.state
		events.push(...newEvents)
		this.setState({
			events
		})
		console.log('app', this.state.events)
	}
	onBlur(event) {
		if (!event.currentTarget.contains(event.relatedTarget)) {
			this.returnHome()
		}
	}
	render({ /* props */ }, { events }) {
		return (
			<div id="app">
				{(this.state.selectedMonth === '')
					?
					<Calendar
						onSelectMonth={this.selectMonth}
						selectedMonth={this.state.selectedMonth}
						eventCycle={this.handleUpdateEvents.bind(this)}
						events={events}
					/>
					:
					<Month
						month={this.state.selectedMonth}
						onSelectMonth={this.selectMonth}
						selectedMonth={this.state.selectedMonth}
						eventCycle={this.handleUpdateEvents.bind(this)}
						events={events}
						onBlurChange={this.onBlur.bind(this)}
					/>
				}
			</div>
		);
	}
}
