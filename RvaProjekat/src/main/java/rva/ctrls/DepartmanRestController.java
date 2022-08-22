package rva.ctrls;

import java.util.Collection;

import javax.transaction.Transactional;

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

import rva.jpa.Departman;
import rva.repository.DepartmanRepository;

@CrossOrigin
@RestController
public class DepartmanRestController {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	

	@Autowired
	private DepartmanRepository departmanRepository;
	
	
	
	@GetMapping("departman")
	public Collection<Departman> GetDepartmani()
	{
		return departmanRepository.findAll();
	}
	
	@GetMapping("departman/{id}")
	public Departman getDepartman(@PathVariable("id") Integer id)
	{
		return departmanRepository.getOne(id);
	}
	
	@GetMapping("departmanNaziv/{naziv}")
	public Collection<Departman> getDepartmanByNaziv(@PathVariable("naziv") String naziv)
	{
		return departmanRepository.findByNazivContainingIgnoreCase(naziv);
	}
	
	@PostMapping("departman")
	public ResponseEntity<Departman> insertDepartman(@RequestBody Departman departman)
	{
		if(!departmanRepository.existsById(departman.getId()))
		{
			departmanRepository.save(departman);
			return new ResponseEntity<Departman>(HttpStatus.OK);
		}
		return new ResponseEntity<Departman>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("departman")
	public ResponseEntity<Departman> updateDepartman(@RequestBody Departman departman)
	{
		if(!departmanRepository.existsById(departman.getId()))
		{
			return new ResponseEntity<Departman>(HttpStatus.NO_CONTENT);
		}
		departmanRepository.save(departman);
		return new ResponseEntity<Departman>(HttpStatus.OK);
	}
	
	@Transactional
	@DeleteMapping("departman/{id}")
	public ResponseEntity<Departman> deleteDepartman(@PathVariable("id") Integer id)
	{
		if(!departmanRepository.existsById(id))
		{
			return new ResponseEntity<Departman>(HttpStatus.NO_CONTENT);
		}
		jdbcTemplate.execute("DELETE FROM student where departman= " + id);
		
		departmanRepository.deleteById(id);
		if (id == -100)
		{
			
			jdbcTemplate.execute(
					"INSERT INTO \"departman\"(\"id\", \"naziv\", \"oznaka\", \"fakultet\") "
					+ "VALUES (-100, 'Test', 'Test', 1 )");
		}
		return new ResponseEntity<Departman>(HttpStatus.OK);
	}
	
	
}
