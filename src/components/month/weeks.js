import { h, Component } from 'preact'
import style from './style.less'
import _ from 'lodash'

import Days from './days'

export default class Weeks extends Component {
    constructor(props) {
        super(props)
        this.props = { ...props }
    }
    state = {
        last: 0,
        weeks: []
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { last, weeks } = nextState

        if (last === 0) {
            return true;
        }

        if (weeks.length < 6) {
            return true;
        }

        if (nextProps !== this.props) {
            return true;
        }

        return false;
    }

    componentDidUpdate() {
        let { start } = this.props
        let { last, weeks } = this.state

        if (last === 0) {
            last = (7 - Number(start)) + 1
        } else {
            last = Number(last) + 7
        }

        weeks.push(last)

        this.setState({
            last, weeks
        })
    }

    render({ month, year, start, end, selectDate, selectedDate, events }, { weeks }) {
        const firstWeek = () =>
            (
                <tr className={style.whiteTr}>
                    {_.range(start).map(() =>
                        <th></th>
                    )}
                    {_.range(7 - start).map(i =>
                        <Days day={i + 1} month={month} year={year} selectDate={selectDate.bind(this)} selectedDate={selectedDate} events={events} />
                    )}
                </tr>
            )

        const Week = (w) =>
            (
                <tr className={style.whiteTr}>
                    {_.range(7).map((i) =>
                        <Days day={i + weeks[w]} month={month} year={year} selectDate={selectDate.bind(this)} selectedDate={selectedDate} events={events} />
                    )}
                </tr>
            )

        const lastWeek = (w) =>
            (
                <tr className={style.whiteTr}>
                    {_.range(end - weeks[w] + 1).map(i =>
                        <Days day={i + weeks[w]} month={month} year={year} selectDate={selectDate.bind(this)} selectedDate={selectedDate} events={events} />
                    )}
                    {_.range(7 - (end - weeks[w])).map(() =>
                        <th></th>
                    )}
                </tr>
            )

        const final = (w) => {
            const oneMore = ((end - weeks[w] + 1) >= 8);

            if (oneMore) {
                let week = (
                    [Week(w), lastWeek(w + 1)]
                )
                return week;
            }

            let week = (lastWeek(w))

            return week;
        }

        return (
            <table>
                <tr className={style.orangeTr}>
                    <th>S</th>
                    <th>M</th>
                    <th>T</th>
                    <th>W</th>
                    <th>T</th>
                    <th>F</th>
                    <th>S</th>
                </tr>
                {firstWeek()}
                {Week(0)}
                {Week(1)}
                {Week(2)}
                {final(3)}

            </table>
        )

    }
}
