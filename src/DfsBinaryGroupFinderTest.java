import static org.junit.Assert.*;

import java.util.*;

import org.junit.Test;

public class DfsBinaryGroupFinderTest {
    @Test
    public void test_DfsBinaryGroupFinder_simple() {
        int[][] testImgData = 
        {
               // 0,1,2,3,4,5
        /*0*/    {1,1,1,0,1,1},
        /*1*/    {0,0,0,0,1,1},
        /*2*/    {1,1,0,0,0,0},
        /*3*/    {1,1,0,1,1,1},
        /*4*/    {1,1,0,1,1,1},

        };
        List<Group> actual = DfsBinaryGroupFinder(testImgData);
        List<Group> expected = new ArrayList<>();

        expected.add(new Group{3, new Coordinate(1, 0)});
        expected.add(new Group{4, new Coordinate(0, 0)});
        expected.add(new Group{6, new Coordinate(0, 3)});
        expected.add(new Group{6, new Coordinate(4, 3)});

        assertEquals(expected, actual);
    }
}
