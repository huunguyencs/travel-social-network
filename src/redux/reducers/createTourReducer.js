import * as TOUR_TYPES from '../constants/createTourConstant';
// import * as dateUtils from '../../utils/date';

const INIT_STATE = {
  name: '',
  content: '',
  hashtags: [],
  image: null,
  tour: [],
  isFetching: false,
  error: null,
  cost: 0,
  recommendService: null
};

const createTourReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case TOUR_TYPES.CREATE_TOUR: {
      // them tour (chua cap nhat len database)
      // var dateStr = dateUtils.convertDateToStr(action.payload.date);
      return {
        ...INIT_STATE,
        name: action.payload.name,
        tour: [
          {
            date: action.payload.date,
            events: [],
            description: '',
            services: [],
            cost: 0
          }
        ]
      };
    }
    case TOUR_TYPES.ADD_NEW_DATE: {
      var newDate = new Date(state.tour[state.tour.length - 1].date);
      newDate.setDate(newDate.getDate() + 1);
      // dateStr = dateUtils.convertDateToStr(newDate);

      return {
        ...state,
        tour: [
          ...state.tour,
          {
            date: newDate,
            events: [],
            description: '',
            services: [],
            cost: 0
          }
        ]
      };
    }
    case TOUR_TYPES.ADD_NEW_LOCATION: {
      const new_loc = {
        description: '',
        location: action.payload?.location,
        time: action.payload?.time
      };

      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                events: [...date.events, new_loc]
              }
            : date
        )
      };
    }
    case TOUR_TYPES.ADD_NEW_SERVICE: {
      const cost = action.payload?.cost || 0;
      const new_ser = {
        description: '',
        cost: cost,
        service: action.payload.service,
        time: action.payload.time
      };

      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                events: [...date.events, new_ser],
                cost: date.cost + cost
              }
            : date
        ),
        cost: state.cost + cost
      };
    }
    case TOUR_TYPES.DELETE_DATE: {
      let newCost = state.cost - state.tour[action.payload.indexDate].cost;
      return {
        ...state,
        tour: [
          ...state.tour.slice(0, action.payload.indexDate),
          ...state.tour.slice(action.payload.indexDate + 1)
        ],
        cost: newCost
      };
    }
    case TOUR_TYPES.DELETE_EVENT: {
      let oldCostLoc =
        state.tour[action.payload.indexDate].events[action.payload.index]
          ?.cost || 0;
      let newCost = state.cost - oldCostLoc;
      let newCostDate = state.tour[action.payload.indexDate]?.cost - oldCostLoc;

      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                cost: newCostDate,
                events: [
                  ...date.events.slice(0, action.payload.index),
                  ...date.events.slice(action.payload.index + 1)
                ]
              }
            : date
        ),
        cost: newCost
      };
    }
    case TOUR_TYPES.UPDATE_DATE: {
      // dateStr = dateUtils.convertDateToStr(action.payload.newDate);
      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                date: action.payload.newDate
              }
            : date
        )
      };
    }
    case TOUR_TYPES.UPDATE_DESCRIPTION_DATE: {
      let oldCost = state.tour[action.payload.indexDate]?.cost || 0;
      const cost = action.payload?.cost || 0;
      let newCost = state.cost - oldCost + cost;
      return {
        ...state,
        cost: newCost,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                cost: cost,
                description: action.payload.description
              }
            : date
        )
      };
    }
    case TOUR_TYPES.UPDATE_LOCATION: {
      let oldCostLoc =
        state.tour[action.payload.indexDate].events[
          action.payload.indexLocation
        ]?.cost || 0;
      const cost = action.payload?.cost || 0;
      let newCost = state.cost - oldCostLoc + cost;
      let newCostDate =
        state.tour[action.payload.indexDate]?.cost - oldCostLoc + cost;
      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                cost: newCostDate,
                events: date.events.map((loc, j) =>
                  j === action.payload.indexLocation
                    ? {
                        ...loc,
                        location: action.payload?.location || loc.location,
                        cost: cost || loc.cost,
                        description:
                          action.payload?.description || loc.description,
                        time: action.payload?.time || loc.time
                      }
                    : loc
                )
              }
            : date
        ),
        cost: newCost
      };
    }
    case TOUR_TYPES.UPDATE_SERVICE: {
      let oldCostSer =
        state.tour[action.payload.indexDate].events[action.payload.index]
          ?.cost || 0;
      const cost = action.payload?.cost || 0;
      let newCost = state.cost - oldCostSer + cost;
      let newCostDate =
        state.tour[action.payload.indexDate]?.cost - oldCostSer + cost;
      return {
        ...state,
        tour: state.tour.map((date, i) =>
          i === action.payload.indexDate
            ? {
                ...date,
                cost: newCostDate,
                events: date.events.map((loc, j) =>
                  j === action.payload.index
                    ? {
                        ...loc,
                        service: action.payload?.service || loc.service,
                        cost: cost || loc.cost,
                        description:
                          action.payload?.description || loc.description,
                        time: action.payload?.time || loc.time
                      }
                    : loc
                )
              }
            : date
        ),
        cost: newCost
      };
    }

    case TOUR_TYPES.UPDATE_INFO_TOUR: {
      return {
        ...state,
        name: action.payload.name,
        hashtags: action.payload.hashtags,
        content: action.payload.content,
        cost: action.payload.cost
      };
    }
    case TOUR_TYPES.CHANGE_IMAGE: {
      return {
        ...state,
        image: action.payload.image
      };
    }
    case TOUR_TYPES.RECOMMEND_SERVICE: {
      return {
        ...state,
        recommendService: action.payload
      };
    }
    case TOUR_TYPES.LOAD_TOUR: {
      return {
        ...state,
        ...action.payload.tour
      };
    }
    case TOUR_TYPES.RESET_TOUR: {
      return {
        name: '',
        content: '',
        hashtags: [],
        image: null,
        tour: [],
        isFetching: false,
        error: null,
        cost: 0
      };
    }
    default: {
      return state;
    }
  }
};

export default createTourReducer;
