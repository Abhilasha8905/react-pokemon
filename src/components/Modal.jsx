import PropTypes from 'prop-types';
import '../styles/modal.css';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const Modal = ({ pokemon, onClose }) => {
  const statsData = [
    { stat: 'HP', value: pokemon.hp },
    { stat: 'Attack', value: pokemon.attack },
    { stat: 'Defense', value: pokemon.defence },
    { stat: 'Sp. Attack', value: pokemon.special_attack },
    { stat: 'Sp. Defense', value: pokemon.special_defence },
    { stat: 'Speed', value: pokemon.speed },
  ];

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <button className='close-button' onClick={onClose}>&#10006;</button>
        <h2 className='pokemon-name'>{pokemon.name.toUpperCase()}</h2>
        <div className='modal-images'>
          <img src={pokemon.front_image} alt={`${pokemon.name} front`} className='pokemon-img' />
          <img src={pokemon.back_image} alt={`${pokemon.name} back`} className='pokemon-img' />
        </div>
        <div className='pokemon-stats'>
          <p><strong>Type:</strong> {pokemon.type.join(', ')}</p>
          <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Height:</strong> {pokemon.height / 10} m</p>
        </div>
        <div className='stats-graph'>
          <RadarChart cx={150} cy={125} outerRadius={80} width={300} height={250} data={statsData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="stat" />
            <PolarRadiusAxis />
            <Radar name={pokemon.name} dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  pokemon: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
