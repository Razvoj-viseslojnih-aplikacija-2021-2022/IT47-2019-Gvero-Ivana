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


import rva.jpa.Status;
import rva.repository.StatusRepository;


@CrossOrigin
@RestController
public class StatusRestController {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	

	@Autowired
	private StatusRepository statusRepository;
	
	@GetMapping("status")
	public Collection<Status> GetStatusi()
	{
		return statusRepository.findAll();
	}
	
	@GetMapping("status/{id}")
	public Status getStatus(@PathVariable("id") Integer id)
	{
		return statusRepository.getOne(id);
	}
	
	@GetMapping("statusNaziv/{naziv}")
	public Collection<Status> getStatusByNaziv(@PathVariable("naziv") String naziv)
	{
		return statusRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("status")
	public ResponseEntity<Status> insertStatus(@RequestBody Status status)
	{
		if(!statusRepository.existsById(status.getId()))
		{
			statusRepository.save(status);
			return new ResponseEntity<Status>(HttpStatus.OK);
		}
		return new ResponseEntity<Status>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("status")
	public ResponseEntity<Status> updateStatus(@RequestBody Status status)
	{
		if(!statusRepository.existsById(status.getId()))
		{
			return new ResponseEntity<Status>(HttpStatus.NO_CONTENT);
		}
		statusRepository.save(status);
		return new ResponseEntity<Status>(HttpStatus.OK);
	}
	
	@DeleteMapping("status/{id}")
	public ResponseEntity<Status> deleteStatus(@PathVariable("id") Integer id)
	{
		if(!statusRepository.existsById(id))
		{
			return new ResponseEntity<Status>(HttpStatus.NO_CONTENT);
		}
		statusRepository.deleteById(id);
		if (id == -100)
		{
			
			jdbcTemplate.execute(
					"INSERT INTO \"status\"(\"id\", \"naziv\", \"oznaka\") "
					+ "VALUES (-100, 'Test', 'Test')");
		}
		return new ResponseEntity<Status>(HttpStatus.OK);
	}
	
	
	
	
}
