package rva.ctrls;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import rva.jpa.Fakultet;
import rva.repository.FakultetRepository;

@CrossOrigin
@RestController
public class FakultetRestController {

@Autowired
private JdbcTemplate jdbcTemplate;
	
@Autowired
private FakultetRepository fakultetRepository;


@GetMapping("fakultet")
public Collection<Fakultet> GetFakulteti()
{
	return fakultetRepository.findAll();
}

@GetMapping("fakultet/{id}")
public Fakultet getFakultet(@PathVariable("id") Integer id)
{
	return fakultetRepository.getOne(id);
}

@GetMapping("fakultetNaziv/{naziv}")
public Collection<Fakultet> getFakultetByNaziv(@PathVariable("naziv") String naziv)
{
	return fakultetRepository.findByNazivContainingIgnoreCase(naziv);
}

@PostMapping("fakultet")
public ResponseEntity<Fakultet> insertFakultet(@RequestBody Fakultet fakultet)
{
	if(!fakultetRepository.existsById(fakultet.getId()))
	{
		fakultetRepository.save(fakultet);
		return new ResponseEntity<Fakultet>(HttpStatus.OK);
	}
	return new ResponseEntity<Fakultet>(HttpStatus.CONFLICT);
}


@PutMapping("fakultet")
public ResponseEntity<Fakultet> updateFakultet(@RequestBody Fakultet fakultet)
{
	if(!fakultetRepository.existsById(fakultet.getId()))
	{
		return new ResponseEntity<Fakultet>(HttpStatus.NO_CONTENT);
	}
	fakultetRepository.save(fakultet);
	return new ResponseEntity<Fakultet>(HttpStatus.OK);
}
	

@DeleteMapping("fakultet/{id}")
public ResponseEntity<Fakultet> deleteFakultet(@PathVariable("id") Integer id)
{
	if(!fakultetRepository.existsById(id))
	{
		return new ResponseEntity<Fakultet>(HttpStatus.NO_CONTENT);
	}
	fakultetRepository.deleteById(id);
	if (id == -100)
	{
		
		jdbcTemplate.execute(
				"INSERT INTO \"fakultet\"(\"id\", \"naziv\", \"sediste\") "
				+ "VALUES (-100, 'Test', 'Test')");
	}
	return new ResponseEntity<Fakultet>(HttpStatus.OK);
}
}
