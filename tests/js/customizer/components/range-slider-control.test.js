/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';

/**
 * Internal dependencies
 */
import RangeSliderControl from '../../../../assets/src/customizer/components/range-slider-control';

/**
 * Render the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <RangeSliderControl { ...props } /> );
};

/**
 * Mount the component.
 *
 * @param {Object} props - Component props
 * @return {Function} A functional component.
 */
const setupMount = props => {
	return mount( <RangeSliderControl { ...props } /> );
};

const mockOnChangeFn = jest.fn();

const baseProps = {
	id: 'mtb-small_component_radius',
	label: 'Small Component Radius',
	description: 'This is a test description',
	value: 10,
	min: 0,
	max: 36,
	step: 1,
	onChange: mockOnChangeFn,
};

describe( 'RangeSliderControl', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'should have its value changed after the input number field value is changed', () => {
		const wrapper = setupMount( baseProps );

		const input = wrapper.find( 'input.components-range-control__number' );

		input.simulate( 'change', {
			target: {
				value: 5,
				checkValidity: () => true,
			},
		} );

		expect(
			wrapper.find( 'input.components-range-control__number' ).prop( 'value' )
		).toBe( 5 );

		expect( mockOnChangeFn ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'should have its value changed after the input range field value is changed', () => {
		const wrapper = setupMount( baseProps );

		const input = wrapper.find( 'input.components-range-control__slider' );

		input.simulate( 'change', {
			target: {
				value: 4,
				checkValidity: () => true,
			},
		} );

		expect(
			wrapper.find( 'input.components-range-control__slider' ).prop( 'value' )
		).toBe( 4 );

		expect( mockOnChangeFn ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'should have its value reset to its original value after value being changed and reset', () => {
		const wrapper = setupMount( baseProps );

		const input = wrapper.find( 'input.components-range-control__slider' );

		input.simulate( 'change', {
			target: {
				value: 3,
				checkValidity: () => true,
			},
		} );

		expect(
			wrapper.find( 'input.components-range-control__slider' ).prop( 'value' )
		).toBe( 3 );

		wrapper.find( 'button' ).simulate( 'click' );

		expect( mockOnChangeFn ).toHaveBeenCalledTimes( 2 );

		expect(
			wrapper.find( 'input.components-range-control__slider' ).prop( 'value' )
		).toBe( 10 );
	} );

	it( 'should show the description when the title is clicked', () => {
		const wrapper = setupMount( baseProps );

		wrapper.find( '.range-slider-control-title' ).simulate( 'click' );

		expect(
			wrapper.find( '.customize-control-description' ).getDOMNode()
		).toBeVisible();
	} );
} );
